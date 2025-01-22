import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function BreadcrumbComponents() {
  const location = useLocation();

  // Pecah path menjadi array berdasarkan '/'
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb fontWeight="medium" fontSize="sm">
      <BreadcrumbItem>
        <BreadcrumbLink>Home</BreadcrumbLink>
      </BreadcrumbItem>

      {pathnames.map((value, index) => {
        // Buat path kumulatif untuk setiap segment
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <BreadcrumbItem key={to} isCurrentPage={isLast}>
            {isLast ? (
              <BreadcrumbLink>{displayName}</BreadcrumbLink>
            ) : (
              <BreadcrumbLink>{displayName}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

export default BreadcrumbComponents;
