# Intro

## RUN: 
- `docker-compose up -d db`
- `cd back`
	- `yarn migration:run` 
	- `yarn start:dev`
- `cd front && yarn start`
- Launched:	 
	- "FRONT": http://localhost:3000
	- "BACK": http://localhost:3001


## RUN IN DOCKER (TO BE FIXED):
Run the "Yak Shop" App:
- `docker-compose up -d react_app`
- Migrations (run migrations in the "BACK" container):
	- `docker exec -it yaks-back sh`
	- `yarn migration:run`
- Launched:	 
	- "FRONT": http://localhost:3000
	- "BACK": http://localhost:3001

## API (BACK):
- /herd   <!-- herd data -->
- /shop/:t   <!-- stock state by a day -->
- /orders   <!-- CRUD controller for placing an order -->
   - /         
   - /:id      (@get)
   - /:delete  (@delete)
   - /:t       (@post with body: `{customer: string; order : { milk?: number; skins?: number; })`)
    
    
### TODO:
- Tests FE/BE;
- Uploading XML with base configuration (@see ./back/src/herd/herd.service.ts);
- API routes naming fix;
- Docker deployment fix;
- Some clean-up;
