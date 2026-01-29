<!-- Create a Database -->
CREATE DATABASE nest_prisma_app;
<!-- Install Nest CLI  -->
npm install -g @nestjs/cli
<!-- Create a New Nest JS Project -->
nest new nest-prisma-app
<!-- Install Prisma CLI and PostgreSQL Client -->
npm install @prisma/client
npm install prisma --save-dev
npm install pg
<!-- Initialize Prisma -->
npx prisma init
<!-- Initialize Prisma client -->
npx prisma generate
<!-- Prisma migration -->
npx prisma migrate dev --name init
<!-- generate module, service and controller -->
nest generate module uom
nest generate controller uom
nest generate service uom

<!-- frontend with react & typescript -->
npm create vite@latest my-react-app --template react-ts
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init