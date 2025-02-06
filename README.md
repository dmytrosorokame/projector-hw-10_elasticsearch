# Projector HSA Home work #10: Elasticsearch

To Start the project, run the following command:

```bash
docker compose up --build
```

Wait for the project to start.

To Create the index, you need to run the following command:

```bash
curl -X POST http://localhost:8000/elasticsearch
```

You can check the index creation status by visiting `http://localhost:5601/app/management/data/index_management/indices`

To Check suggestions, you can visit Web Page on `http://localhost:80` and use the search input.
