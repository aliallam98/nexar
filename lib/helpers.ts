export function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")
  return `ORD-${year}-${random}`
}

export function calculateDiscount(coupon: any, subtotal: number): number {
  let discount = 0

  if (coupon.discountType === "PERCENTAGE") {
    discount = (subtotal * coupon.discountValue) / 100
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount
    }
  } else {
    discount = coupon.discountValue
  }

  return Math.min(discount, subtotal)
}

export async function validateCoupon(
  coupon: any,
  userId: string,
  orderTotal: number,
  prisma: any,
): Promise<{ valid: boolean; error?: string }> {
  if (!coupon || !coupon.isActive) {
    return { valid: false, error: "Invalid coupon" }
  }

  const now = new Date()
  if (coupon.startsAt && coupon.startsAt > now) {
    return { valid: false, error: "Coupon not yet active" }
  }
  if (coupon.expiresAt && coupon.expiresAt < now) {
    return { valid: false, error: "Coupon expired" }
  }

  if (coupon.maxUseCount && coupon.usedCount >= coupon.maxUseCount) {
    return { valid: false, error: "Coupon usage limit reached" }
  }

  if (coupon.maxUsePerUser) {
    const userUsageCount = await prisma.couponUsage.count({
      where: { couponId: coupon.id, userId },
    })
    if (userUsageCount >= coupon.maxUsePerUser) {
      return {
        valid: false,
        error: "You have reached the usage limit for this coupon",
      }
    }
  }

  if (coupon.minPurchase && orderTotal < coupon.minPurchase) {
    return {
      valid: false,
      error: `Minimum purchase of ${coupon.minPurchase} EGP required`,
    }
  }

  return { valid: true }
}
