import { Text, TextProps } from "./Themed";

type FontTypes = "bold" | "regular";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}

export function SansText(props: TextProps & { fontType?: FontTypes }) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: props?.fontType === "bold" ? "dm-sans-bold" : "dm-sans",
        },
      ]}
    />
  );
}

export function MontserratText(props: TextProps & { fontType?: FontTypes }) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily:
            props?.fontType === "bold" ? "montserrat-bold" : "montserrat",
        },
      ]}
    />
  );
}
