-- First, drop the model if it exists to avoid concurrent update issues
DROP MODEL IF EXISTS `meta-coral-456317-g8.bioauth_ds.bioauth_risk_model`;

-- Then create a fresh model
CREATE MODEL `meta-coral-456317-g8.bioauth_ds.bioauth_risk_model`
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
  `meta-coral-456317-g8.bioauth_ds.keystroke_behavioral_baselines`;
