// =============================================================================
// data/placeholders/account.placeholders.ts
// Placeholder data for the /account page.
// TODO: Replace with real API calls once the bookings API is implemented.
// =============================================================================

export interface MockRental {
  id: number;
  car: string;
  location: string;
  dates: string;
  status: "Completed" | "Upcoming" | "Ongoing" | "Cancelled";
  price: number;
  image: string;
}

/** Placeholder rental history. Replace with real API data. */
export const MOCK_RENTALS: MockRental[] = [
  {
    id: 1,
    car: "Nissan Rogue",
    location: "Los Angeles, CA",
    dates: "Jul 8 - Jul 11, 2026",
    status: "Completed",
    price: 267,
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLs4J3Qb761Pkm6T4w-nF3GYFIAaoEBwWPVB56cQMj4iT_hbEpITueiJRvpQIsExZjYkadANR1Y9Ho9YjJByLheLyS0I22uMvEIQaFZxbh5rd7tZgT_i0CutDK8cSfIwHEY6NMqgUzCsf5OuMWQOeheSeUkVvteXE5rQ6L2Fqo9JVaWbV1dll_KGJQB83eLvu8mhzEGSxJ3e4Xjc7dDs_1Q-VEnScISYWKCttvF5-Zapf2ynb7B9MX1RB7xl",
  },
  {
    id: 2,
    car: "Tesla Model 3",
    location: "Seattle, WA",
    dates: "Aug 2 - Aug 5, 2026",
    status: "Upcoming",
    price: 336,
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLuVokeoWVVYiqP0zjQP7SzdFdxq45V2XM7q6Nq6zeSW7TikYgoRkO2BdLbGLY4tMO4PI0-A8ePstZZhTDap88UXOJ_9btZLO_qH164Z9y0vhmUhAhTp96dxW6hngwSfpxiZvkT4DCmEcGgi6RIx6zFN0uU-x_g9Z9WjtnGn-YqZ-NYnhpKNSqvFr2gn1DQ1qIqmQw7yp1TTOJzKXRjgniZLkOEErffw9PyoR0YeIioI727i_ngGOmhCgfuW",
  },
];
