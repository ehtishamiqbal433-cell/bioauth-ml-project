CREATE OR REPLACE MODEL `forward-sentry-456317-k6.bioauth_dataset.bioauth_risk_model`
OPTIONS(
  model_type='logistic_reg', 
  input_label_cols=['anomaly_label']
) AS
SELECT 
  dwell_time,
  flight_time,
  speed_cps,
  anomaly_label
FROM 
  `forward-sentry-456317-k6.bioauth_dataset.keystroke_behavioral_baselines`;
