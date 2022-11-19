APIs:

curl --request GET 'http://localhost:8080/api/generateToken' \
--header 'Content-Type: application/json' \
--data-raw '{
"username" : "yourUserName"
}'

---

“spin” :

curl --request POST 'http://localhost:8080/api/spin' \
--header 'Authorization: Bearer yourJwtToken' \

---

“wild” :

x is a query param

curl --request POST 'http://localhost:8080/api/wild?x=5' \
--header 'Authorization: Bearer yourJwtToken' \

---

“blast” :

curl --request POST 'http://localhost:8080/api/blast' \
--header 'Authorization: Bearer yourJwtToken' \
