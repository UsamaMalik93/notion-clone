"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const BreadCrumb = () => {
  const path = usePathname();
  const segments = path.split("/").filter(Boolean); //filter out empty if not present

  const renderBreadCrumb = (isLast: boolean, segment: string, href: string) => {
    if (isLast) return <BreadcrumbPage>{segment}</BreadcrumbPage>;
    return <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>;
  };

  const renderBreadCrumItems = () =>
    segments.map((segment, index) => {
      if (!segment) return null;
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isLast = index === segments.length - 1;
      return (
        <Fragment key={index}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {renderBreadCrumb(isLast, segment, href)}
          </BreadcrumbItem>
        </Fragment>
      );
    });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {renderBreadCrumItems()}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
