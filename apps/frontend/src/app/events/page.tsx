import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/table";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import type { Metadata } from "next";
<<<<<<< Updated upstream:apps/frontend/src/app/events/page.tsx
import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import { Divider } from "../../components/divider";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "../../components/dropdown";
import { Heading } from "../../components/heading";
import { Input, InputGroup } from "../../components/input";
import { Link } from "../../components/link";
import { Select } from "../../components/select";
import { getEvents } from "../../data";
=======
import { Button } from "../../../components/button";
import { Heading } from "../../../components/heading";
import { Input, InputGroup } from "../../../components/input";
import { Select } from "../../../components/select";
import { getRecentOrders } from "../../../data";
>>>>>>> Stashed changes:apps/frontend/src/app/dashboard/events/page.tsx

export const metadata: Metadata = {
  title: "Events",
};

export default async function Events() {
  const orders = getRecentOrders();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>My Repository</Heading>
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
        <Button>Create insight</Button>
      </div>
<<<<<<< Updated upstream:apps/frontend/src/app/events/page.tsx
      <ul className="mt-10">
        {events.map((event, index) => (
          <>
            <li key={event.id}>
              <Divider soft={index > 0} />
              <div className="flex items-center justify-between">
                <div key={event.id} className="flex gap-6 py-6">
                  <div className="w-32 shrink-0">
                    <Link href={event.url} aria-hidden="true">
                      <img
                        className="aspect-[3/2] rounded-lg shadow"
                        src={event.imgUrl}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-base/6 font-semibold">
                      <Link href={event.url}>{event.name}</Link>
                    </div>
                    <div className="text-xs/6 text-zinc-500">
                      {event.date} at {event.time}{" "}
                      <span aria-hidden="true">·</span> {event.location}
                    </div>
                    <div className="text-xs/6 text-zinc-600">
                      {event.ticketsSold}/{event.ticketsAvailable} tickets sold
                    </div>
                  </div>
=======
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
>>>>>>> Stashed changes:apps/frontend/src/app/dashboard/events/page.tsx
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
