'use strict';
/**
 * Product.js controller
 *
 * @description: A set of functions called "actions" for managing `Product`.
 */
module.exports = {
  /**
 * Retrieves all the products with fields valid with Snipcart's JSON crawler.
 *
 * @return {Object}
 */
  snipcartParser: async (ctx) => {
    let products = await strapi.services.product.fetchAll(ctx.query);
    return products.map(product => {
      return {
        id: product._id,
        price: product.price,
        url: "https://snipcart-strapi.herokuapp.com/snipcartParser"
      }
    })
  },
  /**
   * Retrieve product records.
   *
   * @return {Object|Array}
   */
  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.product.search(ctx.query);
    } else {
      return strapi.services.product.fetchAll(ctx.query, populate);
    }
  },
  /**
   * Retrieve a product record.
   *
   * @return {Object}
   */
  findOne: async (ctx) => {
    return strapi.services.product.fetch(ctx.params);
  },
  /**
   * Count product records.
   *
   * @return {Number}
   */
  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.product.count(ctx.query, populate);
  },
  /**
   * Create a/an product record.
   *
   * @return {Object}
   */
  create: async (ctx) => {
    return strapi.services.product.add(ctx.request.body);
  },
  /**
   * Update a/an product record.
   *
   * @return {Object}
   */
  update: async (ctx, next) => {
    return strapi.services.product.edit(ctx.params, ctx.request.body);
  },
  /**
   * Destroy a/an product record.
   *
   * @return {Object}
   */
  destroy: async (ctx, next) => {
    return strapi.services.product.remove(ctx.params);
  }
};