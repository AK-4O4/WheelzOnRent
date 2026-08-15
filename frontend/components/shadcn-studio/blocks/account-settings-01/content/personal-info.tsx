'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ImageIcon, UploadCloudIcon, TrashIcon, CheckCircleIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const DEFAULT_AVATAR = 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=0ea5e9'

const countries = [
  { value: 'pakistan',      label: 'Pakistan',      flag: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png' },
  { value: 'india',         label: 'India',          flag: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png' },
  { value: 'usa',           label: 'United States',  flag: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png' },
  { value: 'uk',            label: 'United Kingdom', flag: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png' },
  { value: 'canada',        label: 'Canada',         flag: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png' },
  { value: 'australia',     label: 'Australia',      flag: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png' },
  { value: 'china',         label: 'China',          flag: 'https://cdn.shadcnstudio.com/ss-assets/flags/china.png' },
  { value: 'uae',           label: 'UAE',            flag: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png' },
  { value: 'germany',       label: 'Germany',        flag: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png' },
  { value: 'france',        label: 'France',         flag: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png' },
]

interface PersonalInfoProps {
  /** Called after a successful save so the parent can refresh the sidebar avatar */
  onAvatarChange?: (url: string) => void
}

const PersonalInfo = ({ onAvatarChange }: PersonalInfoProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'

  // ── Form state ─────────────────────────────────────────────────────────────
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)   // local blob preview
  const [currentAvatar, setCurrentAvatar] = useState<string>(DEFAULT_AVATAR) // saved avatar
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [mobile, setMobile]       = useState('')
  const [country, setCountry]     = useState('')
  const [gender, setGender]       = useState('')

  // ── UI state ───────────────────────────────────────────────────────────────
  const [loadingData, setLoadingData] = useState(true)
  const [saving, setSaving]           = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [savedOk, setSavedOk]         = useState(false)
  const [error, setError]             = useState<string | null>(null)

  // ── Load profile on mount ──────────────────────────────────────────────────
  useEffect(() => {
    async function loadProfile() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoadingData(false); return }

      // Always seed from session metadata first so fields are never empty
      const metaName: string = session.user.user_metadata?.full_name ?? ''
      const metaParts = metaName.trim().split(' ')
      setFirstName(metaParts[0] ?? '')
      setLastName(metaParts.slice(1).join(' ') ?? '')

      try {
        const res = await fetch(`${apiUrl}/api/users/me`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        })

        if (!res.ok) throw new Error(`${res.status}`)

        const json = await res.json()
        const u = json.data

        // Override with backend data (more up-to-date after profile edits)
        if (u.fullName) {
          const parts = u.fullName.trim().split(' ')
          setFirstName(parts[0] ?? '')
          setLastName(parts.slice(1).join(' ') ?? '')
        }
        if (u.phoneNumber) setMobile(u.phoneNumber)

        if (u.profilePictureUrl) {
          setCurrentAvatar(u.profilePictureUrl)
        } else {
          const seed = encodeURIComponent((u.fullName ?? metaName ?? 'User').slice(0, 2))
          setCurrentAvatar(`https://api.dicebear.com/9.x/initials/svg?seed=${seed}&backgroundColor=0ea5e9`)
        }
      } catch (err) {
        // API unavailable — fall back to session metadata (names already set above)
        console.warn('Could not fetch profile from backend, using session data:', err)
        const seed = encodeURIComponent((metaName || session.user.email || 'U').slice(0, 2))
        setCurrentAvatar(`https://api.dicebear.com/9.x/initials/svg?seed=${seed}&backgroundColor=0ea5e9`)
      } finally {
        setLoadingData(false)
      }
    }
    loadProfile()
  }, [apiUrl])

  // ── Local blob preview for selected file ──────────────────────────────────
  useEffect(() => {
    if (!file) { setPreview(null); return }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  // ── File selection ─────────────────────────────────────────────────────────
  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!f.type.startsWith('image/')) { alert('Please select an image file'); return }
    if (f.size > 2 * 1024 * 1024)    { alert('File must be smaller than 2 MB'); return }
    setFile(f)
    setError(null)
  }

  const openPicker = () => inputRef.current?.click()

  const removeFile = () => {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  // ── Upload avatar to Supabase Storage ─────────────────────────────────────
  async function uploadAvatar(userId: string, token: string): Promise<string | null> {
    if (!file) return null
    setUploadingAvatar(true)
    const ext  = file.name.split('.').pop() ?? 'jpg'
    const path = `${userId}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(path, file, { upsert: true, contentType: file.type })

    setUploadingAvatar(false)

    if (uploadError) {
      setError(`Avatar upload failed: ${uploadError.message}`)
      return null
    }

    const { data } = supabase.storage.from('profile-pictures').getPublicUrl(path)
    // bust cache with a timestamp so the browser re-fetches
    return `${data.publicUrl}?t=${Date.now()}`
  }

  // ── Save handler ───────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { setError('Not signed in'); setSaving(false); return }

    // 1. Upload avatar if a new file was picked
    let newAvatarUrl: string | null = null
    if (file) {
      newAvatarUrl = await uploadAvatar(session.user.id, session.access_token)
      if (!newAvatarUrl) { setSaving(false); return }
    }

    // 2. Build PATCH body
    const body: Record<string, string> = {
      fullName: `${firstName.trim()} ${lastName.trim()}`.trim(),
    }
    if (mobile)       body.phoneNumber       = mobile
    if (newAvatarUrl) body.profilePictureUrl = newAvatarUrl

    // 3. Call the backend
    try {
      const res = await fetch(`${apiUrl}/api/users/me`, {
        method:  'PATCH',
        headers: {
          'Content-Type':  'application/json',
          Authorization:   `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        throw new Error(errJson.message ?? `Server error ${res.status}`)
      }

      // 4. Update local UI
      if (newAvatarUrl) {
        setCurrentAvatar(newAvatarUrl)
        onAvatarChange?.(newAvatarUrl)   // tell parent to refresh sidebar
        setFile(null)
      }

      setSavedOk(true)
      setTimeout(() => setSavedOk(false), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  // ── Avatar to display (local preview > current saved) ─────────────────────
  const displayedAvatar = preview ?? currentAvatar

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
      {/* Left label */}
      <div className='flex flex-col space-y-1'>
        <h3 className='font-semibold'>Personal Information</h3>
        <p className='text-muted-foreground text-sm'>Manage your personal information and role.</p>
      </div>

      {/* Form */}
      <div className='space-y-6 lg:col-span-2'>
        {error && (
          <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='mx-auto space-y-6'>
          {/* ── Avatar ──────────────────────────────────────────────────────── */}
          <div className='w-full space-y-2'>
            <Label>Your Avatar</Label>
            <div className='flex items-center gap-4'>
              {/* Preview circle */}
              <div
                role='button'
                tabIndex={0}
                aria-label='Upload your avatar'
                onClick={openPicker}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker() } }}
                className='relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-200 hover:border-sky-400 transition-colors'
              >
                {loadingData ? (
                  <div className='h-full w-full animate-pulse bg-slate-100' />
                ) : displayedAvatar ? (
                  <img src={displayedAvatar} alt='avatar' className='h-full w-full object-cover' />
                ) : (
                  <ImageIcon className='text-slate-400' />
                )}
              </div>

              <div className='flex items-center gap-2'>
                <input ref={inputRef} type='file' accept='image/*' className='hidden' onChange={onSelect} />
                <Button type='button' variant='outline' onClick={openPicker} className='flex items-center gap-2' disabled={uploadingAvatar}>
                  <UploadCloudIcon />
                  {uploadingAvatar ? 'Uploading…' : 'Upload avatar'}
                </Button>
                {file && (
                  <Button type='button' variant='ghost' onClick={removeFile} className='text-destructive!'>
                    <TrashIcon />
                  </Button>
                )}
              </div>
            </div>
            <p className='text-muted-foreground text-sm'>
              {file ? `Selected: ${file.name}` : 'Pick a photo up to 2 MB. Changes save when you click Save.'}
            </p>
          </div>

          {/* ── Name + fields grid ──────────────────────────────────────────── */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='flex flex-col items-start gap-2'>
              <Label htmlFor='personal-first-name'>First Name</Label>
              <Input
                id='personal-first-name'
                placeholder='John'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                disabled={loadingData}
              />
            </div>
            <div className='flex flex-col items-start gap-2'>
              <Label htmlFor='personal-last-name'>Last Name</Label>
              <Input
                id='personal-last-name'
                placeholder='Doe'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                disabled={loadingData}
              />
            </div>
            <div className='flex flex-col items-start gap-2'>
              <Label htmlFor='personal-mobile'>Mobile</Label>
              <Input
                id='personal-mobile'
                type='tel'
                placeholder='+1 (555) 123-4567'
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                disabled={loadingData}
              />
            </div>
            <div className='flex flex-col items-start gap-2'>
              <Label htmlFor='personal-country'>Country</Label>
              <Select value={country} onValueChange={(v) => setCountry(v ?? '')}>
                <SelectTrigger id='personal-country' className='w-full'>
                  <SelectValue placeholder='Select country' />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(c => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='personal-gender'>Gender</Label>
              <Select value={gender} onValueChange={(v) => setGender(v ?? '')}>
                <SelectTrigger id='personal-gender' className='w-full'>
                  <SelectValue placeholder='Select a gender' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='male'>Male</SelectItem>
                    <SelectItem value='female'>Female</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Actions ─────────────────────────────────────────────────────── */}
          <div className='flex items-center justify-end gap-3'>
            {savedOk && (
              <span className='flex items-center gap-1.5 text-sm text-emerald-600 font-medium'>
                <CheckCircleIcon className='size-4' />
                Saved!
              </span>
            )}
            <Button type='submit' disabled={saving || loadingData}>
              {saving ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonalInfo
