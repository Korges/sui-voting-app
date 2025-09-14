import { createFileRoute } from "@tanstack/react-router";
import CollectMomentView from "../views/CollectMomentView";

export const Route = createFileRoute("/moment")({
  component: CollectMomentView
});