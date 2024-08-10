
# Paytm

A paytm like app that lets you add money from a dummy bank server(bank-webhook) and transfer money to other users. I have used turborepo with nextJS to create this project.


![image](https://github.com/user-attachments/assets/4610db16-0d52-4a83-a112-56ad95a7160a)
![image (1)](https://github.com/user-attachments/assets/29ebdeb2-200c-416c-9a51-d0a742657e69)
![image (2)](https://github.com/user-attachments/assets/77e3e12c-bb58-4dca-91f9-2c7a9f8b4325)
![image (3)](https://github.com/user-attachments/assets/695b7f03-9c1b-46d4-a267-6ef7d12a78a4)




## Installation :-

``` 
git clone https://github.com/Rahulv1130/Paytm-turborepo.git
```

Then, you need to install Dependencies :
```
npm install
```


Now, replace the .env.example files with .env files, and change the variable values accordingly.


Initialize the Database: 
```
cd packages/db
```
First replace the DATABSE_URL in .env with the database url, then :

```
npx prisma migrate dev
npx prisma generate
```

To start the app, navigate to the root folder and type :
```
npm run dev
```

To use the bank-webhook server :
```
cd apps/bank-webhook
npm run server
```
