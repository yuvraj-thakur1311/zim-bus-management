import { Router } from "express";
import { getBuses, bookBus, searchBus} from "../controllers/controllerLogic";
const router = Router();

router.get("/buses", getBuses);
router.post("/book/:id", bookBus);
router.get("/bus/search", searchBus);

export default router;