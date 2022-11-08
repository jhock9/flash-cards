<h1 align="center">Welcome to VB-MAPP 👋</h1>

## Verbal Behavior Milestones Assessment and Placement Program
***
## Table of Contents
1. [Introduction](#introduction)
2. [Usage](#usage)
3. [API Configuration](#api-configuration)
4. [Author](#author)
***
## Introduction
This is a digital representation of the VB-MAPP flashcard assessment model.
***
## Usage
Use the **FILTER** button to filter the flashcards by type.

When you are ready for a new set of flashcards, just click the **NEXT** button.
***
## API Configuration

API information is stored on a hidden .env file using **dotenv**.

#### Using dotenv
First, install the package in your terminal.

'npm install dotenv --save'

Next add the following to your .js file.

'require('dotenv').config()'

Then create a .env file in the root directory and add the variables to it.

//contents of .env
SECRET_KEY=abcd1234

'API_KEY = "your-API-key-here

API_URL = https://yourAPIurl.com/api/

Finally, add the **.env** file to your .**gitignore** file so Git ignores it and it *never* ends up on GitHub. You can add any keys you want to this file.
***
## Author

👤 **Jon Hocker**

* Website: www.jonhocker.com
* Github: [@jhock9](https://github.com/jhock9)
* LinkedIn: [@jonhocker](https://linkedin.com/in/jonhocker)

## Show your support

Give a ⭐️ if this project helped you!
