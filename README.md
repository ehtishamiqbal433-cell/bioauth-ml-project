# 🛡️ Zero Trust BioAuth MLOps Pipeline & BigQuery ML Engine

[![GCP BigQuery ML](https://img.shields.io/badge/GCP-BigQuery_ML-4285F4?logo=google-cloud&logoColor=white)](https://cloud.google.com/bigquery)
[![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Security: Keyless WIF](https://img.shields.io/badge/Security-Workload_Identity_Federation-00C7B7?logo=google-cloud&logoColor=white)](https://cloud.google.com/iam/docs/workload-identity-federation)
[![Model: XGBoost](https://img.shields.io/badge/ML-XGBoost_Classifier-FF6F00?logo=xgboost&logoColor=white)](https://xgboost.readthedocs.io/)

An enterprise-grade, serverless continuous authentication pipeline designed to enforce **Zero Trust Security** using keystroke dynamics biometrics. 

The system captures continuous behavioral timing metrics (dwell time, flight time, typing speed), computes high-gain kinematic features, and dynamically scores session risk in **Google Cloud BigQuery ML** via automated, keyless **GitHub Actions CI/CD workflows**, backed by a proxy Node.js backend and frontend application.

---

## 🏗️ System Architecture
