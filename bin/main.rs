use std::time::Duration;
use chrono::{Local, Utc};
use tokio_cron_scheduler::{JobSchedulerError, JobScheduler, Job };
use resource_grab::pdl_qianggou::start_job;

#[tokio::main]
async fn main() -> Result<(), JobSchedulerError> {
    start_job().await
}