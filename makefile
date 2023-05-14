up:
	cp .env.example .env
	-rm -rf ./.db-data
	docker-compose -f docker-compose.local.yaml up

local:
	yarn run start:local