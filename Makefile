build:
	docker build -t chandhudev0/image-e-commerce:server .

push:
    docker push chandhudev0/image-e-commerce:server	

run:
	docker run -d -p 5000:5000 api-server