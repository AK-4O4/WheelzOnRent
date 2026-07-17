wheelzonrent-backend/
├── src/
│   ├── config/
│   │   ├── db.ts                    # Supabase client init
│   │   └── env.ts                   # env variable validation
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── error.middleware.ts
│   │
│   ├── routes/
│   │   ├── index.ts                 # combines all routers
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── kyc.routes.ts
│   │   ├── vehicle.routes.ts
│   │   ├── booking.routes.ts
│   │   ├── payment.routes.ts
│   │   ├── dispute.routes.ts
│   │   ├── message.routes.ts
│   │   ├── review.routes.ts
│   │   └── admin.routes.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── kyc.controller.ts
│   │   ├── vehicle.controller.ts
│   │   ├── booking.controller.ts
│   │   ├── payment.controller.ts
│   │   ├── dispute.controller.ts
│   │   ├── message.controller.ts
│   │   ├── review.controller.ts
│   │   └── admin.controller.ts
│   │
│   ├── services/                    # business logic (controllers stay thin)
│   │   ├── auth.service.ts
│   │   ├── vehicle.service.ts
│   │   ├── booking.service.ts
│   │   ├── escrow.service.ts        # smart contract interaction (ethers.js)
│   │   └── notification.service.ts
│   │
│   ├── schemas/                     # zod validation schemas
│   │   ├── auth.schema.ts
│   │   ├── vehicle.schema.ts
│   │   ├── booking.schema.ts
│   │   └── kyc.schema.ts
│   │
│   ├── types/
│   │   ├── express.d.ts             # extend Request type (req.user)
│   │   └── models.d.ts              # shared TS interfaces (User, Vehicle, etc.)
│   │
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── asyncHandler.ts          # wraps controllers, catches errors
│   │   └── jwt.ts
│   │
│   ├── app.ts                       # express app setup, middleware mounting
│   └── server.ts                    # entry point, app.listen()
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
