// ---------------------------------------------------------------------------
// Central route index — re-export all routers from here.
// app.ts imports this file and mounts each router at its base path.
// ---------------------------------------------------------------------------

export { default as userRoutes } from "./user.routes";
export { default as vehicleRoutes } from './vehicle.routes';

// Add more routers here as you build them out, e.g.:
// export { default as bookingRoutes }  from './bookingRoutes';
// export { default as reviewRoutes }   from './reviewRoutes';
