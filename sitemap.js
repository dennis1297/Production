const router = require('express').Router();
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');

let sitemap;
router.get('/', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  if (sitemap) {
    res.send(sitemap);
    return;
  }
  try {
    const smStream = new SitemapStream({
      hostname: 'https://www.opseazy.com/',
    });
    const pipeline = smStream.pipe(createGzip());
    // pipes
    smStream.write({ url: '/', changefreq: 'daily', priority: 1 });
    smStream.write({ url: '/about', changefreq: 'daily', priority: 1 });
    smStream.write({ url: '/contact', changefreq: 'daily', priority: 1 });
    smStream.write({url: '/career',changefreq: 'daily',priority: 1,});
    smStream.write({
      url: '/services/devops-services',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.write({
      url: '/services/cloud-services',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.write({
      url: '/services/product-engineering',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.write({
      url: '/services/advance-engineering',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.write({
      url: '/services/testing-services',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.write({
      url: '/services/infra-services',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.write({
      url: '/industries/financial',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.write({
      url: '/industries/retail',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.write({
      url: '/industries/logistic',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.write({
      url: '/industries/telecommunication',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.write({
      url: '/industries/education',
      changefreq: 'daily',
      priority: 1,
    });
    smStream.end();
    streamToPromise(pipeline).then((sm) => {
      sitemap = sm;
      return sitemap;
    });
    pipeline.pipe(res).on('error', (e) => {
      throw e;
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

module.exports = router;
