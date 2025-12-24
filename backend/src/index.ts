import express, { Request, Response } from "express";
import cors from "cors";
import routeDetails from "./routes/route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Bus Management system is working fine..");
});

app.use("/details", routeDetails);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
