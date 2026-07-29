import { useEffect, useState } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';
import PageTransition from '../../components/PageTransition';
import { usersApi } from '../../api/users.api';
import type { User } from '../../types';

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => { usersApi.findAll().then(setUsers); }, []);

  return (
    <PageTransition>
      <Container className="py-5">
        <h1 className="fw-bold mb-4">Manage users</h1>
        <Table responsive hover className="align-middle bg-white shadow-sm">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>ID</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><Badge bg={u.role === 'admin' ? 'danger' : 'secondary'}>{u.role}</Badge></td>
                <td><code>{u.id.slice(0, 8)}</code></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </PageTransition>
  );
}