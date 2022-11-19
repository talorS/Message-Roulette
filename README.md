APIs:

“spin” :

curl --request POST 'http://localhost:8080/api/spin' \
--header 'Authorization: Bearer yourSecretKey' \

---

“wild” :

x is a query param

curl --request POST 'http://localhost:8080/api/wild?x=5' \
--header 'Authorization: Bearer yourSecretKey' \

---

“blast” :

curl --request POST 'http://localhost:8080/api/blast' \
--header 'Authorization: Bearer yourSecretKey' \
