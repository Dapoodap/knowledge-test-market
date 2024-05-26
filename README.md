## Database Configuration

#### DB : 
- Name : `market_db`
- host : `localhost`




## API Specification

### Authentication

### 1. Login

- Method: POST
- Endpoint: `.../users/login`
- Request Body:

```json
{
  "email": "String{Email}",
  "password": "String"
}
```

- Response Body (200)

```json
{
    "Message": "Data ditemukan dan berhasil login",
    "data": [
        {
            "id": "String",
            "name": "String",
            "email": "String",
            "pass": "String",
            "jenisKelamin": "Enum [laki-laki/perempuan]",
        },...
    ],
    "token": "String"
}
```

- Response Body (404)

```json
{
  "Message": "Data tidak ditemukan",
  "data": null,
  "token": null
}
```

- Response Body (401)

```json
{
  "Message": "email dan password tidak sesuai !",
  "data": null,
  "token": null
}
```

- Response Body (500)

```json
{
  "Message": "Internal Server Error"
}
```

### 2. Register

- Method: POST
- Endpoint: `.../users/register`
- Request Body:

```json
{
  "name": "String",
  "email": "String{Email}",
  "password": "String",
  "jenisKelamin": "Enum [laki-laki/perempuan]"
}
```

- Response Body (201)

```json
{
  "Message": "Register Success",
  "data": {
    "id": "String",
    "name": "String",
    "email": "String",
    "pass": "String",
    "jenisKelamin": "Enum [laki-laki/perempuan]"
  }
}
```

- Response Body (500)

```json
{
  "Message": "Internal Server Error"
}
```

### 3. getAllUser

- Method: GET
- Endpoint: /users
- Header: Authorization: 'Bearer token'
- Response Body:

- Response Body (200)

```json
{
    "Message": "sukses get all user",
    "data": [
        {
            "_id": "String",
            "name": "String",
            "email": "String",
            "pass": "String",
            "role": "String"
        }
    ],...
}

```

- Response Body (500)

```json
{
  "Message": "Internal Server Error"
}
```

### 4. getUserById

- Method: GET
- Endpoint: /users/{:id}
- Header: Authorization: 'Bearer token'
- Response Body:
- Response Body (200)

```json
{
    "Message": "user berhasil ditemukan",
    "data": =
        {
            "id": "String",
            "name": "String",
            "email": "String",
            "pass": "String",
            "jenisKelamin": "Enum [laki-laki/perempuan]",
        }
}
```

- Response Body (404)

```json
{
  "Message": "tidak dapat menemukan user",
  "data": null
}
```

- Response Body (500)

```json
{
  "Message": "Internal Server Error"
}
```

### 5. editUserById

- Method: PUT
- Endpoint: /users/{:id}
- Header: Authorization: 'Bearer token'
- Request Body:

```json
{
  "email": "String{Email}",
  "password": "String"
}
```

- Response Body:

- Response Body (200)

```json
{
  "Message": "Data pengguna berhasil diperbarui",
  "data": {
    "id": "String",
    "name": "String",
    "email": "String",
    "pass": "String",
    "jenisKelamin": "Enum [laki-laki/perempuan]"
  }
}
```

- Response Body (404)

```json
{
  "Message": "Gagal mengupdate data pengguna tidak ditemukan",
  "data": null
}
```

- Response Body (500)

```json
{
  "Message": "Gagal mengupdate data pengguna"
}
```

### 6. deleteUserById

- Method: DELETE
- Endpoint: /users/{:id}
- Header: Authorization: 'Bearer token'
- Response Body:

- Response Body (200)

```json
{
  "Message": "sukses hapus data",
  "data": {
    "id": "String",
    "name": "String",
    "email": "String",
    "pass": "String",
    "jenisKelamin": "Enum [laki-laki/perempuan]"
  }
}
```

- Response Body (404)

```json
{
  "Message": "gagal untuk hapus data, tidak bisa menemukan id",
  "data": null
}
```

- Response Body (500)

```json
{
  "Message": "internal server error"
}
```

### 7. AddProduct

- Method: POST
- Endpoint: `.../products`
- Header: Authorization: 'Bearer token'
- Request Body:

```json
{
  "name": "String",
  "deskripsi": "Text",
  "harga": "Decimal",
  "file": "file"
}
```

- Response Body (201)

```json
{
  "Message": "Sukses create data product",
  "data": {
  "name": "String",
  "deskripsi": "Text",
  "harga": "Decimal",
  "file": "String {url}"
};
}
```

- Response Body (500)

```json
{
  "Message": "Internal Server Error"
}
```

### 8. getAllProduct

- Method: GET
- Endpoint: `.../products`
- Response Body :
- Response Body (200)

```json
{
  "Message": "Sukses ambil data semua produk",
  "data": [
    {
  "name": "String",
  "deskripsi": "Text",
  "harga": "Decimal",
  "file": "String {url}"
},...
  ]
}
```

- Response Body (500)

```json
{
  "Message": "Gagal ambil data semua produk"
}
```

### 9. getProductById

- Method: GET
- Endpoint: /products/{:id}
- Response Body:
- Response Body (200)

```json
{
  "Message": "product berhasil ditemukan",
  "data": {
    "name": "String",
    "deskripsi": "Text",
    "harga": "Decimal",
    "file": "String {url}"
  }
}
```

- Response Body (404)

```json
{
  "Message": "tidak dapat menemukan product id",
  "data": null
}
```

- Response Body (500)

```json
{
  "Message": "Internal Server Error"
}
```

### 10. editProductById

- Method: PUT
- Endpoint: /products/{:id}
- Header: Authorization: 'Bearer token'
- Request Body:

```json
{
  "name": "String",
  "deskripsi": "Text",
  "harga": "Decimal",
  "file": "file"
}
```

- Response Body:

- Response Body (200)

```json
{
  "Message": "Data produk berhasil diperbarui",
  "data": {
    "name": "String",
    "deskripsi": "Text",
    "harga": "Decimal",
    "file": "file"
  }
}
```

- Response Body (404)

```json
{
  "Message": "Gagal mengupdate data produk, id tidak ditemukan",
  "data": null
}
```

- Response Body (500)

```json
{
  "Message": "Terjadi kesalahan dalam mengupdate data product"
}
```

### 11. deleteProductById

- Method: DELETE
- Endpoint: /products/{:id}
- Header: Authorization: 'Bearer token'
- Response Body:

- Response Body (200)

```json
{
  "Message": "Sukses hapus data",
  "data": {
    "name": "String",
    "deskripsi": "Text",
    "harga": "Decimal",
    "file": "file"
  }
}
```

- Response Body (404)

```json
{
  "Message": "Gagal untuk hapus data, tidak bisa menemukan id",
  "data": null
}
```

- Response Body (500)

```json
{
  "Message": "internal server error"
}
```
