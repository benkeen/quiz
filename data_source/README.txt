### Bird Species

1. Download latest XLS from here: http://help.ebird.org/customer/portal/articles/1006825-the-ebird-taxonomy
2. Convert to JSON using: http://shancarter.github.io/mr-data-converter/
3. Create bird_species database in CouchDB.
4. Bulk import the data:

```
DB="http://localhost:8000/bird_species"
curl -H "Content-Type:application/json" -d @data.json -vX POST $DB/_bulk_docs
```
