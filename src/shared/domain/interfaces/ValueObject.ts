export default interface ValueObhect{
    isDefault: () => boolean;
    isValid: () => boolean;
    equals: (other: ValueObhect) => boolean;
    toString: () => string;
}