# Rayeva AI Systems Assignment

This project demonstrates AI-powered modules designed to support **sustainable commerce workflows**.  
The system uses AI to automate product catalog management and assist businesses in generating sustainable procurement proposals.

For this assignment:

- **Module 1 and Module 2 are fully implemented**
- **Module 3 and Module 4 are explained through system architecture**

---


# Implemented Modules

The following modules were fully implemented as part of this assignment.

---

## Module 1 – EcoCatalog AI  
### AI Auto-Category & Tag Generator

EcoCatalog AI automates product catalog enrichment by analyzing product descriptions and generating structured metadata.

### Problem

Managing large product catalogs manually is time-consuming. Businesses need to categorize products, generate SEO tags, and identify sustainability attributes.

### Solution

This module uses an AI model to automatically generate:

- Primary category
- Subcategory
- SEO tags
- Sustainability filters

The generated output is returned as structured JSON and stored in the database.

---

## Module 2 – EcoProcure AI  
### AI B2B Procurement Proposal Generator

EcoProcure AI helps businesses generate sustainable purchasing proposals based on their needs and available budget.

### Problem

Businesses moving toward sustainable products often struggle to decide:

- Which eco-friendly products to purchase
- How to distribute their available budget
- How their purchasing decisions affect sustainability goals

### Solution

This module uses AI to generate a procurement proposal using:

- Business type
- Purchasing purpose
- Budget

The AI suggests a sustainable product mix, allocates the budget across products, and generates an impact summary describing the sustainability benefits.

### Example Input

Business Type: Eco Friendly Cafe  
Purpose: Takeaway packaging  
Budget: 5000

### Example Output

```json
{
  "product_mix": [
    {
      "product": "Compostable Paper Cups",
      "quantity": 400,
      "estimated_cost": 1600
    },
    {
      "product": "Bagasse Food Containers",
      "quantity": 300,
      "estimated_cost": 1800
    }
  ],
  "total_budget": 5000,
  "impact_summary": "Switching to compostable packaging helps reduce plastic waste and supports sustainable business practices."
}

# System Architecture

# Architecture for Remaining Modules

## Module 3 – AI Impact Reporting Generator

Proposed architecture:
Order Data
     │
     ▼
Impact Calculation Engine
     │
     ├ Plastic Saved
     ├ Carbon Avoided
     └ Local Sourcing Impact
     │
     ▼
AI Impact Statement Generator
     │
     ▼
Store Impact Report in Database


## Module 4 – AI WhatsApp Support Bot

Proposed architecture:
Customer WhatsApp Message
        │
        ▼
WhatsApp Business API
        │
        ▼
Backend Webhook
        │
        ▼
AI Intent Detection
        │
        ├ Order Status Query
        ├ Return Policy Question
        └ Refund Request
        │
        ▼
Database Query
        │
        ▼
Automated Response or Escalation


### Tech Stack
## Frontend

  React (Vite)

## Backend

  Node.js
  Express

## AI Integration

  Google Gemini API

## Database

  MongoDB

### Architecture Overview:

Frontend (React)
       │
       ▼
Backend API (Node.js / Express)
       │
       ▼
AI Processing (Gemini API)
       │
       ▼
Structured JSON Output
       │
       ▼
MongoDB Storage

### How to run:

Make sure the following are installed on your system:

- Node.js
- npm
- MongoDB

---

## Running Module 1 – EcoCatalog AI

### Backend

Navigate to the backend folder: 
run npm install cors mongoose express dotenv @google/generative-ai

run node server.js

then server will start running