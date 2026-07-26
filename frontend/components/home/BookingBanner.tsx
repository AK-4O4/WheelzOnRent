"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";

export default function BookingBanner() {
  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: colorful street photo */}
          <div className="relative rounded-2xl overflow-hidden h-72 md:h-80 order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
              alt="Colorful street"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-pink-400/30 to-blue-400/10" />
          </div>

          {/* Right: mini booking form */}
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Book now
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Find your perfect car for any journey
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Whether it&apos;s a weekend getaway, a business trip, or an
              adventure abroad — we have the right car for you.
            </p>

            {/* Mini form */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where would you like to pick up?"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pick-up date"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Drop-off date"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg">
                Search available cars
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
