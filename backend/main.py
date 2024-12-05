from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from web3 import Web3
from typing import Union
import os
from solcx import compile_standard, install_solc
import json
import array

# DB
import mysql.connector

# CHANGE THE BELOW VARIABLES WITH VALUES FROM GANACHE
my_address = "0x88379a4fC01CC72930BA8316EC6D7643b8115fa9"
private_key = "0x27084e9cf81a1abc52de3daf2735f24f20c8d3ac3c976700ebd955f1207fe077"

# Setting up FastAPI tags and metadata
tags_metadata = [
    {
        "name": "Items",
    },
    {
        "name": "Users",
    }, 
    {
        "name": "Transactions",
    }
]

app = FastAPI(title="Galactic Pancakes API", openapi_tags=tags_metadata)

origins = ["*"]

# MySQL database connection configuration
# Database config on Mercury
db_config = {
    "host": "feenix-mariadb.swin.edu.au",
    "user": "s103800614",
    "password": "210203",
    "database": "s103800614_db"
}

# Required fields to POST a transaction
class Transaction(BaseModel):
    itemID: int
    cost: int
    fromUserID: int
    toUserID: int

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Error Handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {"message": f"Oops! {exc.detail}"}

# GET all items
@app.get("/items/", tags=["Items"])
def get_all_items():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all students)
        query = "SELECT * FROM items"

        # Execute the SQL query
        cursor.execute(query)

        # Fetch all the rows
        result = cursor.fetchall()

        # Convert the result to a list of dictionaries
        items = [dict(zip(cursor.column_names, row)) for row in result]

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        return {"status": "200 OK", "content": items}
    
    except HTTPException as err:
        return err

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

# GET a single item
@app.get("/items/{item_id}", tags=["Items"])
def get_item(item_id: int):
    try:
        if item_id <= 0:
            raise HTTPException(detail="Invalid Item ID", status_code=400)

        connection = mysql.connector.connect(**db_config)

        cursor = connection.cursor()

        query = "SELECT * FROM items WHERE itemID = " + str(item_id)

        cursor.execute(query)

        result = cursor.fetchone()

        item = zip(cursor.column_names, result)

        cursor.close()
        connection.close()

        return {"status": "200 OK", "content": item}
    
    except HTTPException as err:
        return err
    
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

# GET all users
@app.get("/users/", tags=["Users"])
def get_all_users():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all students)
        query = "SELECT * FROM users"

        # Execute the SQL query
        cursor.execute(query)

        # Fetch all the rows
        result = cursor.fetchall()

        # Convert the result to a list of dictionaries
        users = [dict(zip(cursor.column_names, row)) for row in result]

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        return {"status": "200 OK", "content": users}
    
    except HTTPException as err:
        return err

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

# GET a single user
@app.get("/users/{user_id}", tags=["Users"])
def get_user(user_id: int):
    try:
        if user_id <= 0:
            raise HTTPException(detail="Invalid Item ID", status_code=400)
        
        connection = mysql.connector.connect(**db_config)

        cursor = connection.cursor()

        query = "SELECT * FROM users WHERE userID = " + str(user_id)

        cursor.execute(query)

        result = cursor.fetchone()

        user = zip(cursor.column_names, result)

        cursor.close()
        connection.close()

        return {"status": "200 OK", "content": user}

    except HTTPException as err:
        return err
    
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

# GET transaction(s)
@app.get("/transactions/", tags=["Transactions"])
def get_all_transactions(
        transactionID: Union[int, None] = None,
        itemID: Union[int, None] = None,
        minCost: Union[int, None] = None,
        maxCost: Union[int, None] = None,
        fromUserID: Union[int, None] = None,
        toUserID: Union[int, None] = None,
        fullDetails: bool = False
    ):
    try:
        # Creating Search Filters
        whereQueryArray = []
        if transactionID:
            whereQueryArray.append(f"(T.transactionID = {transactionID})")

        if itemID:
            whereQueryArray.append(f"(T.itemID = {itemID})")

        if minCost and maxCost:
            whereQueryArray.append(f"(T.cost >= {minCost} AND T.cost <= {maxCost})")
        elif minCost:
            whereQueryArray.append(f"(T.cost >= {minCost})")
        elif maxCost:
            whereQueryArray.append(f"(T.cost <= {maxCost})")

        if fromUserID and toUserID and fromUserID == toUserID:
            whereQueryArray.append(f"(T.fromUserID = {fromUserID} OR T.toUserID = {toUserID})")
        elif fromUserID and toUserID and fromUserID != toUserID:
            whereQueryArray.append(f"(T.fromUserID = {fromUserID} AND T.toUserID = {toUserID})")
        elif fromUserID:
            whereQueryArray.append(f"(T.fromUserID = {fromUserID})")
        elif toUserID:
            whereQueryArray.append(f"(T.toUserID = {toUserID})")
        
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all students)
        query = ""
        if (fullDetails == True):
            query = "SELECT T.transactionID, T.date, T.itemID, T.fromUserID, T.toUserID, T.cost, F.username AS 'fromUsername', R.username AS 'toUsername', I.name AS 'itemName', I.imageReference AS 'imageReference' FROM transactions T INNER JOIN users F ON T.fromUserID = F.userID INNER JOIN users R ON T.toUserID = R.userID INNER JOIN items I ON I.itemID = T.itemID"
        else:
            query = "SELECT * FROM transactions T"

        # Checks if there are extra parameters
        if (len(whereQueryArray) > 0):
            query += " WHERE " + ' AND '.join(whereQueryArray)
        
        print(query)

        # Execute the SQL query
        cursor.execute(query)

        # Fetch all the rows
        result = cursor.fetchall()

        # Convert the result to a list of dictionaries
        transactions = [dict(zip(cursor.column_names, row)) for row in result]

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        return {"status": "200 OK", "content": transactions}
    
    except HTTPException as err:
        return err

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

# POST a transaction
@app.post("/transactions/", tags=["Transactions"])
async def create_transaction(transaction: Transaction):
    try:
        w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
        chain_id = 1337

        with open("./ItemTransactionContract.sol", "r") as file:
            item_transaction_file = file.read()
            
        install_solc("0.6.0")
        compiled_sol = compile_standard(
            {
                "language": "Solidity",
                "sources": {"ItemTransactionContract.sol": {"content": item_transaction_file}},
                "settings": {
                    "outputSelection": {
                        "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                    }
                },
            },
            solc_version="0.6.0",
        )

        with open("compiled_code.json", "w") as file:
            json.dump(compiled_sol, file)

        # get bytecode
        bytecode = compiled_sol["contracts"]["ItemTransactionContract.sol"]["ItemTransactionContract"]["evm"][
            "bytecode"
        ]["object"]

        # get abi
        abi = compiled_sol["contracts"]["ItemTransactionContract.sol"]["ItemTransactionContract"]["abi"]

        # Contract Creation Transaction
        ItemTransactionContract = w3.eth.contract(abi=abi, bytecode=bytecode)

        nonce = w3.eth.get_transaction_count(my_address)

        item_transaction = ItemTransactionContract.constructor().build_transaction(
            {
                "chainId": chain_id,
                "gasPrice": w3.eth.gas_price,
                "from": my_address,
                "nonce": nonce,
            }
        )
        item_transaction.pop('to')


        signed_txn = w3.eth.account.sign_transaction(item_transaction, private_key=private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)


        transaction_contract = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)

        buy_item_transaction = transaction_contract.functions.buyItem(transaction.itemID, transaction.cost, transaction.fromUserID, transaction.toUserID).build_transaction(
            {
                "chainId": chain_id,
                "gasPrice": w3.eth.gas_price,
                "from": my_address,
                "nonce": nonce + 1,
            }
        )

        signed_store_txn = w3.eth.account.sign_transaction(buy_item_transaction, private_key=private_key)
        send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
        tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)
        connection = mysql.connector.connect(**db_config)

        cursor = connection.cursor()

        query = "INSERT INTO transactions (date, itemID, fromUserID, toUserID, cost) VALUES (CURRENT_TIMESTAMP, %s, %s, %s, %s)"
        val = (transaction.itemID, transaction.fromUserID, transaction.toUserID, transaction.cost)

        cursor.execute(query, val)

        connection.commit()

        transaction_id = cursor.lastrowid

        query = f"SELECT * FROM transactions WHERE transactionID = {str(transaction_id)}"

        cursor.execute(query)

        result = cursor.fetchone()

        transaction_json = dict(zip(cursor.column_names, result))

        cursor.close()
        connection.close()

        return {"status": "200 OK", "content": transaction_json}
    
    except HTTPException as err:
        return err
    
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}