function formatTaxCode(props) {
  if (!props) return props;
  const taxCode = props.replace(/[^\d]/g, "");
  return taxCode;
}

export default formatTaxCode;
