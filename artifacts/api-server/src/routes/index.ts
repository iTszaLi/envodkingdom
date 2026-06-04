import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import statsRouter from "./stats";
import shipmentsRouter from "./shipments";
import servicesRouter from "./services";
import testimonialsRouter from "./testimonials";
import faqsRouter from "./faqs";
import teamRouter from "./team";
import articlesRouter from "./articles";
import clientsRouter from "./clients";
import inquiriesRouter from "./inquiries";
import settingsRouter from "./settings";
import notificationsRouter from "./notifications";
import heroVideosRouter from "./hero-videos";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/stats", statsRouter);
router.use("/shipments", shipmentsRouter);
router.use("/services", servicesRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/faqs", faqsRouter);
router.use("/team", teamRouter);
router.use("/articles", articlesRouter);
router.use("/clients", clientsRouter);
router.use("/inquiries", inquiriesRouter);
router.use("/settings", settingsRouter);
router.use("/notifications", notificationsRouter);
router.use("/hero-videos", heroVideosRouter);

export default router;
