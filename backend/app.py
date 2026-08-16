from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
import os


app = Flask(__name__)

CORS(app)


def get_db_connection():

    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv(
            "DB_USER",
            "ecommerce_user"
        ),
        password=os.getenv(
            "DB_PASSWORD",
            "ecommerce_password"
        ),
        database=os.getenv(
            "DB_NAME",
            "ecommerce"
        )
    )


@app.route("/")
def home():

    return jsonify({
        "message": "E-Commerce Backend is running"
    })


@app.route("/api/health")
def health():

    return jsonify({
        "status": "healthy"
    })


@app.route("/api/products")
def products():

    connection = get_db_connection()

    cursor = connection.cursor(
        dictionary=True
    )

    cursor.execute(
        "SELECT id, name, description, price "
        "FROM products"
    )

    products = cursor.fetchall()

    cursor.close()

    connection.close()

    return jsonify(products)


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
