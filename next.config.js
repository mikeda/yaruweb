module.exports = {
  images: {
    domains: [
      process.env.NODE_ENV === 'production'
        ? 'd2ybk292wkc2jl.cloudfront.net'
        : 'yarouyo-dev.s3-ap-northeast-1.amazonaws.com',
    ],
  },
};
