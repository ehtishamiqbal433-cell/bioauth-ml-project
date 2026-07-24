CREATE OR REPLACE MODEL `meta-coral-456317-g8.bioauth_ds.bioauth_risk_model`
OPTIONS(
  model_type = 'BOOSTED_TREE_CLASSIFIER',
  input_label_cols = ['anomaly_label'],
  max_iterations = 50,
  tree_method = 'HIST',
  auto_class_weights = TRUE
) AS
SELECT 
  dwell_time,
  flight_time,
  speed_cps,
  -- Advanced engineered features
  SAFE_DIVIDE(dwell_time, NULLIF(flight_time, 0)) AS dwell_to_flight_ratio,
  (dwell_time * speed_cps) AS cadence_intensity,
  ABS(dwell_time - flight_time) AS timing_asymmetry,
  anomaly_label
FROM 
  `meta-coral-456317-g8.bioauth_ds.keystroke_behavioral_baselines`;
