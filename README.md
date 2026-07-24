# 🛡️ Zero Trust BioAuth MLOps Pipeline & BigQuery ML Engine

[![GCP BigQuery ML](https://img.shields.io/badge/GCP-BigQuery_ML-4285F4?logo=google-cloud&logoColor=white)](https://cloud.google.com/bigquery)
[![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Security: Keyless WIF](https://img.shields.io/badge/Security-Workload_Identity_Federation-00C7B7?logo=google-cloud&logoColor=white)](https://cloud.google.com/iam/docs/workload-identity-federation)
[![Model: XGBoost](https://img.shields.io/badge/ML-XGBoost_Classifier-FF6F00?logo=xgboost&logoColor=white)](https://xgboost.readthedocs.io/)

An enterprise-grade, serverless continuous authentication pipeline designed to enforce **Zero Trust Security** using keystroke dynamics biometrics. 

The system captures continuous behavioral timing metrics (dwell time, flight time, typing speed), computes high-gain kinematic features, and dynamically scores session risk in **Google Cloud BigQuery ML** via automated, keyless **GitHub Actions CI/CD workflows**.

---

## 🏗️ System Architecture
    *   Initialize the gcloud CLI:
        ```bash
        gcloud init
        ```
    *   Authenticate for Application Default Credentials (needed to call Google Cloud APIs):
        ```bash
        gcloud auth application-default login
        ```

*   **Node.js and npm**: Ensure you have Node.js and its package manager, `npm`, installed on your machine.

## Project Structure

The project is organized into two main directories:

*   `frontend/`: Contains the Frontend application code.
*   `backend/`: Contains the Node.js/Express server code to proxy Google Cloud API calls.

## Backend Environment Variables

The `backend/.env.local` file is automatically generated when you download this application.
It contains essential Google Cloud environment variables pre-configured based on your project settings at the time of download.

The variables set in `backend/.env.local` are:
*   `API_BACKEND_PORT`: The port the backend API server listens on (e.g., `5000`).
*   `API_PAYLOAD_MAX_SIZE`: The maximum size of the request payload accepted by the backend server (e.g., `5mb`).
*   `GOOGLE_CLOUD_LOCATION`: The Google Cloud region associated with your project.
*   `GOOGLE_CLOUD_PROJECT`: Your Google Cloud Project ID.

**Note:** These variables are automatically populated during the download process.
You can modify the values in `backend/.env.local` if you need to change them.

## Installation and Running the App

To install dependencies and run your Google Cloud Vertex AI Studio App locally, execute the following command:

```bash
npm install && npm run dev
