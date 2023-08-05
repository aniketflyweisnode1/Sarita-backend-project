function getAdditionalCharges(
    weight,
    dimensions,
    shipmentValue,
    isInternational
) {
    let additionalCharges = 0;

    // Calculate volumetric weight
    const volumetricWeight =
        (dimensions.length * dimensions.width * dimensions.height) / 5000;

    // Check if volumetric weight is greater than actual weight
    if (volumetricWeight > weight) {
        weight = volumetricWeight;
    }

    // Calculate fuel surcharge
    const fuelSurcharge = isInternational ? 0.2 : 0.1;

    // Add fuel surcharge to additional charges
    additionalCharges += shipmentValue * fuelSurcharge;

    // Add insurance fee for shipments above $1000
    if (shipmentValue > 1000) {
        additionalCharges += 20;
    }

    // Add handling fee for packages over 50 lbs
    if (weight > 50) {
        additionalCharges += 25;
    }

    return additionalCharges;
}
async function calculateShipmentCost(
    unit,
    weight,
    length,
    width,
    height,
    destination
) {
    // Calculate volumetric weight
    if (unit === "cm") {
        const volumetricWeight = (length * width * height) / 5000;
    } else if (unit === "inches") {
        const volumetricWeight = (length * width * height) / 305;
    } else if (unit === "mm") {
        const volumetricWeight = (length * width * height) / 5000000;
    } else {
        const volumetricWeight = (length * width * height) / 0.005;
    }
    // Determine chargeable weight (whichever is greater: actual weight or volumetric weight)
    const chargeableWeight = Math.max(weight, volumetricWeight);

    // Determine shipping zone based on destination
    const shippingZone = await getShippingZone(destination);

    // Calculate base rate based on shipping zone and chargeable weight
    const baseRate = await getBaseRate(shippingZone, chargeableWeight);

    // Calculate additional charges for services such as insurance or customs clearance
    const additionalCharges = await getAdditionalCharges();

    // Calculate total cost of shipment
    const shipmentCost = baseRate + additionalCharges;

    return shipmentCost;
}
