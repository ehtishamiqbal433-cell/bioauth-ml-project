# Security Policy

## Supported Versions

This project follows a rolling security support model focused on the current production release. Security updates are applied to the actively maintained branch and critical infrastructure components.

| Version | Supported |
|:--------|:---------:|
| **v1.x (Latest Stable Release)** | ✅ |
| **v0.x (Development Preview)** | ❌ |
| **Archived / Experimental Branches** | ❌ |

---

## Reporting a Vulnerability

We take security vulnerabilities seriously and appreciate responsible disclosure from security researchers and the community.

### Preferred reporting method

Please report vulnerabilities **privately** by opening a **GitHub Security Advisory** or by contacting the maintainer directly.

- **Preferred Reporting Method:** Submit vulnerabilities through **GitHub Security Advisories** (`Security` → `Report a vulnerability`).
- **Maintainer:** **Ehtisham**
- **Disclosure Policy:** Please do not disclose security vulnerabilities publicly until they have been investigated and resolved. Thank you!
---

## What to include in your report

To help us investigate quickly, please include:

* A clear description of the vulnerability
* Steps to reproduce the issue
* Proof-of-concept code or payloads (if applicable)
* The affected component (frontend, backend, GitHub Actions, BigQuery ML, IAM, etc.)
* The potential impact (privilege escalation, data exposure, authentication bypass, etc.)
* Any suggested mitigation or fix

---

## Response timeline

We aim to follow these response targets:

| Stage                      | Target                             |
| -------------------------- | ---------------------------------- |
| Acknowledgement            | **Within 72 hours**                |
| Initial assessment         | **Within 7 days**                  |
| Status update              | **Every 14 days** until resolution |
| Critical vulnerability fix | **As soon as possible**            |

Complex issues may require additional investigation time, especially when cloud IAM or ML infrastructure is involved.

---

## Scope

The following components are considered in scope:

* GitHub Actions workflows (`.github/workflows/*`)
* OIDC Workload Identity Federation configuration
* Google Cloud IAM policies and service account bindings
* BigQuery datasets and BigQuery ML models
* Node.js / Express backend APIs
* Frontend authentication and session handling
* Secrets management and CI/CD configuration

The following are generally out of scope unless they directly impact this repository:

* Third-party cloud service outages
* Vulnerabilities in upstream dependencies that have not yet been disclosed by the vendor
* Social engineering attacks against project contributors
* Denial-of-service attacks requiring significant external infrastructure

---

## Security best practices implemented

This project is designed around **Zero Trust principles** and includes:

* **Keyless OIDC authentication** for GitHub Actions
* **Workload Identity Federation** (no long-lived service account keys)
* **Least-privilege IAM** role assignments
* **Serverless BigQuery ML** execution
* **Continuous behavioral authentication** using keystroke dynamics
* **Automated CI/CD** with ephemeral credentials
* **Audit-friendly cloud-native architecture**

---

## Disclosure policy

If a vulnerability is accepted:

<List><List.Item>We will work on a fix and validate the remediation.</List.Item><List.Item>A security advisory will be published after the fix is available.</List.Item><List.Item>Reporters may be credited for responsible disclosure unless they request anonymity.</List.Item></List>

If a report is declined, we will provide a brief explanation (for example, duplicate report, out-of-scope issue, or non-security behavior).

---

## Compliance and governance

The repository is being developed with alignment to:

* **Zero Trust Architecture (NIST SP 800-207)**
* **SOC 2 security principles**
* **ISO/IEC 27001 operational practices**
* **Google Cloud security best practices**

---

## Thank you

Thank you for helping improve the security of this project and contributing to a safer cloud-native authentication ecosystem.

