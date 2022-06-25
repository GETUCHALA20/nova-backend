# nova-backend

To run the application 

1. You should have postgres database installed
2. Create `.env` file from `.env.example` and fill the configuration information correctly
3. `npm install` all the packages
4. `sequelize db:migrate` to create tables and relations
5. `sequelize db:seed:all` to populate the database with super admin and admin user, also create predefined roles and permissions
4. `npm run dev`
