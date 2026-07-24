CREATE OR REPLACE MODEL `meta-coral-456317-g8.bioauth_ds.bioauth_risk_model`
OPTIONS(
  model_type = 'BOOSTED_TREE_CLASSIFIER',
  input_label_cols = ['anomaly_label'],
  max_iterations = 100,
  tree_method = 'HIST',
  auto_class_weights = TRUE,
  subsample = 0.85
) AS
SELECT
  -- Core timing metrics
  dwell_time,
  flight_time,
  speed_cps,

  -- Advanced Kinematic & Feature Ratios
  SAFE_DIVIDE(dwell_time, NULLIF(flight_time, 0)) AS dwell_to_flight_ratio,
  (dwell_time * speed_cps) AS cadence_intensity,

  -- Micro-Behavioral & Variance Indicators
  ABS(dwell_time - flight_time) AS timing_asymmetry,
  SAFE_DIVIDE(flight_time, NULLIF(speed_cps, 0)) AS flight_per_speed_unit,

  -- Target label
  anomaly_label
FROM
  `meta-coral-456317-g8.bioauth_ds.keystroke_behavioral_baselines`;
