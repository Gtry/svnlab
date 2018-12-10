import logging

class Logger():
    """
    docstring for Logger
    """
    def __init__(self, logger_name, log_file, log_level):
        self.logger_name = logger_name

        logging.basicConfig(level=logging.INFO,
                            format='%(levelname)-5s [%(asctime)s [%(filename)s %(name)s line:%(lineno)d]] %(message)s',
                            datefmt='%Y-%m-%d %H:%M:%S',
                            # filename=log_file,
                            filemode='a+')

        log_level = getattr(logging, log_level, logging.INFO)
        formatter = logging.Formatter('%(levelname)-5s [%(asctime)s [%(filename)s %(name)s line:%(lineno)d]] %(message)s')
        self.handler = logging.FileHandler(log_file)
        self.handler.setLevel(log_level)
        self.handler.setFormatter(formatter)

    def getInstance(self):
        logger = logging.getLogger(self.logger_name)
        logger.addHandler(self.handler)
        # logger.setLevel(logging.DEBUG)
        return logger
