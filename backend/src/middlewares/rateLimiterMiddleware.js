import rateLimit from "express-rate-limit";


class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.limiter = rateLimit({
      windowMs,
      max: maxRequests,
      message: { error: "Too many requests, please try again later." },
      statusCode: 429, // the HTTP status code for too many requests
      headers: true,
    });
  }

  getMiddleware() {
    return this.limiter;
  }
}

export default RateLimiter;