import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import type { Metadata } from "next";
<<<<<<< Updated upstream:apps/frontend/src/app/orders/page.tsx
import { Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import { Heading } from "../../components/heading";
=======
import { Heading } from "../../../components/heading";
import { Input, InputGroup } from "../../../components/input";
import { Select } from "../../../components/select";
>>>>>>> Stashed changes:apps/frontend/src/app/dashboard/orders/page.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";
import { getOrders } from "../../data";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function Orders() {
  const orders = getOrders();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>[Company] Repository</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search insights&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                {/* <option value="name">Sort by name</option> */}
                <option value="date">Sort by date</option>
                <option value="status">Sort by tag</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            {/* <TableHeader>Order number</TableHeader> */}
            <TableHeader>Date</TableHeader>
            <TableHeader>Author</TableHeader>
            <TableHeader>Insight</TableHeader>
            <TableHeader>Tags</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              href={order.url}
              title={`Order #${order.id}`}
            >
              {/* <TableCell>{order.id}</TableCell> */}
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {/* <Avatar src={order.event.thumbUrl} className="size-6" /> */}
                  <span>{order.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
