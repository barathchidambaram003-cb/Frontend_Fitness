import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import PageTransition from '../../components/PageTransition';
import { productsApi } from '../../api/products.api';
import type { Product, ProductCategory } from '../../types';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const category = params.get('category') as ProductCategory | null;
  const search = params.get('search') ?? '';
  const sort = (params.get('sort') ?? '') as any;

  useEffect(() => {
    setLoading(true);
    productsApi
      .findAll({
        category: category ?? undefined,
        search: search || undefined,
        sort: sort || undefined,
      })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [category, search, sort]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  };

  return (
    <PageTransition>
      <Container className="py-5">
        <h1 className="fw-bold mb-4">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All products'}
        </h1>

        <Row className="mb-4 g-3">
          <Col md={4}>
            <Form.Control
              placeholder="Search products..."
              value={search}
              onChange={(e) => setParam('search', e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={category ?? ''} onChange={(e) => setParam('category', e.target.value)}>
              <option value="">All categories</option>
              <option value="equipment">Equipment</option>
              <option value="supplements">Supplements</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={sort} onChange={(e) => setParam('sort', e.target.value)}>
              <option value="">Sort by</option>
              <option value="price_asc">Price: low to high</option>
              <option value="price_desc">Price: high to low</option>
              <option value="name">Name (A–Z)</option>
            </Form.Select>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5"><Spinner /></div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted py-5">No products found.</p>
        ) : (
          <Row className="g-4">
            {products.map((p) => (
              <Col key={p.id} md={6} lg={4} xl={3}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </PageTransition>
  );
}