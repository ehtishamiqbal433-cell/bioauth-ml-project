-- Sample BigQuery ML Training Script
CREATE OR REPLACE MODEL `forward-sentry-456317-k6.bioauth_dataset.bioauth_risk_model`
OPTIONS(model_type='logistic_reg', input_label_cols=['is_anomaly']) AS
SELECT 
  hold_duration,
  flight_time,
  is_anomaly
FROM 
  `forward-sentry-456317-k6.bioauth_dataset.keystroke_behavioral_baselines`
WHERE 
  training_split = 'TRAIN';
