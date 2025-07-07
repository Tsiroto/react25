import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

function Breadcrumbs() {
  const location = useLocation();
  
  // Don't show breadcrumbs on the home page
  if (location.pathname === '/') {
    return null;
  }
  
  // Split the path into segments
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  
  // Generate breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    // Create the path for this breadcrumb
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    
    // Format the segment for display (capitalize first letter, replace hyphens with spaces)
    const displayName = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    
    // Return the breadcrumb item
    return (
      <li key={path}>
        <Link to={path}>{displayName}</Link>
      </li>
    );
  });
  
  return (
    <nav className="breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {breadcrumbItems}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;