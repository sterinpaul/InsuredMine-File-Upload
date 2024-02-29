# InsuredMine Project Documentation

This repository contains the code for InsuredMine, a backend application designed to handle insurance-related data using Node.js and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Message Endpoints](#message-endpoints)

## Introduction

The InsuredMine project is a backend application developed in Node.js that handles insurance-related data. It provides APIs to upload insurance data from XLSX/CSV files into MongoDB and perform CRUD operations on various collections like User, Account, and Policy.

## Features

- API to upload XLSX/CSV data into MongoDB using worker threads.
- CRUD operations for User, Account, and Policy collections
- Separates data into different MongoDB collections (Agent, User, User's Account, LOB, Carrier, Policy)
- Utilizes MongoDB for efficient storage and retrieval
- Checking cpu usage with 5 second interval. If cpu usage exeeds 70%, the server will restart.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/sterinpaul/InsuredMine-File-Upload.git
2. Install the required dependencies using npm:
    npm install
3. Start the application using nodemon:
    npm start
## Running the Application
To run the application, ensure you have MongoDB running and properly configured. Also, create a .env file in the root directory (inside 'server' folder) with the following details:
PORT = '3000'
MONGODB_ATLAS_URL = 'mongodb+srv://sterinpaul:wbCF8Y9maS4ueOEh@cluster0.xvub3l1.mongodb.net/insuredMine?retryWrites=true&w=majority&appName=Cluster0'

### API Documentation
## User Endpoints

### Upload insurance policy data as csv/xlsx
POST /api/user/upload-data'

### Search a user from db to take policy details
GET /api/user/get-username?username=

### Get policy details of a user
GET /api/user/get-userpolicyinfo?username=

### Get all users policy details aggregated
GET /api/user/get-all-user-policies

## Message Endpoints
### Add message to db at a specific date and time
POST /api/message/add-message
