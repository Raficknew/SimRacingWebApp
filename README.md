# SimRacingWebApp

## Develop

To develop SimRacingWebApp,run these following commands:

- Copy the .env.template file to .env and fill in the values
```
cp .env.template .env
```
- Start the database
```
docker compose up -d
```
- Install all dependencies
```
npm install
```
- Start the development server
```
npm run dev
```
- Thats all! now your app will be available at http://localhost:3000
