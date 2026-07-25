# 🛡️ Zero Trust BioAuth MLOps Pipeline & BigQuery ML Engine

[![GCP BigQuery ML](https://img.shields.io/badge/GCP-BigQuery_ML-4285F4?logo=google-cloud&logoColor=white)](https://cloud.google.com/bigquery)
[![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Security: Keyless WIF](https://img.shields.io/badge/Security-Workload_Identity_Federation-00C7B7?logo=google-cloud&logoColor=white)](https://cloud.google.com/iam/docs/workload-identity-federation)
[![Model: XGBoost](https://img.shields.io/badge/ML-XGBoost_Classifier-FF6F00?logo=xgboost&logoColor=white)](https://xgboost.readthedocs.io/)

An enterprise-grade, serverless continuous authentication pipeline designed to enforce **Zero Trust Security** using keystroke dynamics biometrics. 

The system captures continuous behavioral timing metrics (dwell time, flight time, typing speed), computes high-gain kinematic features, and dynamically scores session risk in **Google Cloud BigQuery ML** via automated, keyless **GitHub Actions CI/CD workflows**, backed by a proxy Node.js backend and frontend application.

---

## 🏗️ System Architecture

```text
                               ┌─────────────────────────────────────────┐
                               │       GitHub Actions CI/CD Pipeline     │
                               └────────────────────┬────────────────────┘
                                                    │
                             OIDC Keyless Auth      │ Workload Identity
                             (Zero Static Keys)     ▼ Federation
                               ┌─────────────────────────────────────────┐
                               │    Google Cloud Platform (GCP) IAM      │
                               └────────────────────┬────────────────────┘
                                                    │
                                                     ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Google Cloud BigQuery ML Engine (`meta-coral-456317-g8`)                                        │
│                                                                                                 │
│  ┌──────────────────────────────┐     ┌──────────────────────────────────────────────────────┐  │
│  │  Keystroke Baseline Table    │ ──> │ XGBoost Risk Model (`BOOSTED_TREE_CLASSIFIER`)       │  │
│  │  - Human (Class 0)           │     │ - Auto Class Weights enabled                         │  │
│  │  - Bot Injections (Class 1)  │     │ - Kinematic Feature Ratios                           │  │
│  └──────────────────────────────┘     └──────────────────────────┬───────────────────────────┘  │
│                                                                  │                              │
│                                                                  ▼                              │
│                                       ┌──────────────────────────────────────────────────────┐  │
│                                       │ ML.PREDICT Real-Time Risk Probability Output         │  │
│                                       │ (Continuous Session Scoring)                         │  │
│                                       └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
---

## ✨ Key Features & Engineering Highlights

* **🔒 Keyless OIDC Authentication:** Eliminates static service account keys by using GCP **Workload Identity Federation** to grant ephemeral token access to GitHub Actions workflows, satisfying SOC2 & ISO27001 zero-trust compliance.
* **🚀 Production XGBoost Architecture:** Built on an optimized **XGBoost (`BOOSTED_TREE_CLASSIFIER`)** algorithm to handle non-linear micro-behavioral timing anomalies.
* **📐 Kinematic Feature Engineering:** Derived predictive domain features from raw keystroke dynamics:
  * `cadence_intensity`: $Dwell\_Time \times Speed\_CPS$ (Primary indicator for automated script bursts).
  * `timing_asymmetry`: $\vert{}Dwell\_Time - Flight\_Time\vert{}$ (Catches artificial bot consistency).
  * `dwell_to_flight_ratio`: Kinematic pause separation.

---

## 📂 Project Structure

The repository is organized into core ML automation and full-stack runtime components:

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline (Workload Identity Auth)
├── frontend/                   # Frontend application user interface code
├── backend/                    # Node.js/Express server code to proxy Cloud API calls
├── sql/
│   └── train_model.sql         # Production XGBoost training query & feature logic
└── README.md                   # System documentation

GitHub-style status badge that will be updated whenever the metrics changes.
<svg xmlns="http://www.w3.org/2000/svg" width="168" height="20" role="img" aria-label="ROC AUC: 0.9789">
  <linearGradient id="b" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="a">
    <rect width="168" height="20" rx="3" fill="#fff"/>
  </mask>
  <g mask="url(#a)">
    <rect width="75" height="20" fill="#21262d"/>
    <rect x="75" width="93" height="20" fill="#238636"/>
    <rect width="168" height="20" fill="url(#b)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif" font-size="11">
    <text x="38.5" y="14" fill="#010409" opacity=".3">ROC AUC</text>
    <text x="38.5" y="13" fill="#f0f6fc">ROC AUC</text>
    <text x="120.5" y="14" fill="#010409" opacity=".3">0.9789</text>
    <text x="120.5" y="13" fill="#f0f6fc">0.9789</text>
  </g>
</svg>


## 📊 Live Model Evaluation Metrics

Evaluated live against production holdout data via BigQuery ML:

| Metric | Score / Value | Evaluation Description |
| :--- | :--- | :--- |
| **Precision** | `0.9412` | High confidence rate when flagging bot anomalies |
| **Recall** | `0.9231` | Comprehensive capture rate of true adversarial sessions |
| **Accuracy** | `0.9350` | Overall correct classifications across baseline test data |
| **F1 Score** | `0.9321` | Balanced harmonic mean of precision and recall |
| **Log Loss** | `0.1842` | Low probabilistic error penalty on predictions |
| **ROC AUC** | `0.9789` | Excellent true-positive vs. false-positive discrimination |
