import { Text, VStack } from "@chakra-ui/react";

export function SelectDefault({
  label,
  value,
  setValue,
  placeholder = "Select",
  disabled = false,
  options = [],
}) {
  return (
    <VStack alignItems={"start"} w={"100%"} gap={"0.4rem"}>
      <Text w={"100%"} fontWeight={600} fontSize={"0.8rem"}>
        {label}
      </Text>
      <select
        style={{
          width: "100%",
          border: "0.1rem solid #e4e4e7",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.3rem",
          paddingTop: "0.8rem",
          paddingBottom: "0.8rem",
        }}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </VStack>
  );
}
